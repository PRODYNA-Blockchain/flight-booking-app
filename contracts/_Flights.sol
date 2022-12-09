// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract FlightNFT is ERC721, Ownable {
    address payable private _owner;
    address nftAdress;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => bool) public sold;

    constructor(string memory name, string memory symbol, address owner, uint seatCount) ERC721(name, symbol) {
        _owner = payable(owner);
        for (uint i = 0; i < seatCount; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _mint(owner, newItemId);
        }
    }

    function book(uint256 seatId, address passenger) external {
        require(_exists(seatId), "Error, seat does not exist");
        require(!sold[seatId], "Error, seat is already sold");
        _transfer(_owner, passenger, seatId);
        sold[seatId] = true;
    }

}


contract Flights is Ownable {
    address payable private _owner;
    constructor() {
        _owner = payable(msg.sender);
    }

    event SeatBooked(bytes32 indexed flightId, address indexed passenger);

    enum FlightStatus { Sale, Closed }
    struct Flight {
        FlightStatus status;
        bytes32 flightId;
        FlightNFT flightNFT;
        uint seatsCount;
        uint seatsRemaining;
        uint seatPrice;
    }

    Flight[] private _flights;
    string[] private _flightIds;
    uint _flightIndex = 0;
    mapping(bytes32 => uint) _flightIndexFromId;

    function createFlight(string memory flightId, uint seatPrice, uint seatCount) public onlyOwner {
        require(seatPrice > 0, "Seat price must be greater than 0");
        require(seatCount > 0, "Flight must have seats");

        bytes32 flightIdBytes = bytes32(bytes(flightId));
        _flightIds.push(flightId);

        FlightNFT _flightNFT = new FlightNFT(flightId, flightId, msg.sender, seatCount);
        Flight memory _flight = Flight(FlightStatus.Sale, flightIdBytes, _flightNFT, seatCount, seatCount, seatPrice);

        _flights.push(_flight);
        _flightIndexFromId[flightIdBytes] = _flightIndex;
        _flightIndex++;
    }

    function closeFlight(bytes32 flightId) public onlyOwner {
        Flight storage flight = getFlight(flightId);
        flight.status = FlightStatus.Closed;
    }

    function book(string memory flightId, uint256 tokenId) public payable {
        bytes32 flightIdBytes = bytes32(bytes(flightId));
        Flight storage flight = getFlight(flightIdBytes);
        require(msg.value > 0, "Price must be greater than zero");
        require(msg.value == flight.seatPrice, "Value must be equal with the current seat price");
        require(flight.status == FlightStatus.Sale, "There is no such open flight");
        require(flight.seatsRemaining > 0, "There are not enough seats to make this booking");

        payable(_owner).transfer(msg.value);
        flight.seatsRemaining--;

        flight.flightNFT.book(tokenId, msg.sender);
        emit SeatBooked(flightIdBytes, msg.sender);
    }

    function getFlightById(string memory flightId) public view
    returns(FlightStatus, bytes32, uint, uint, uint, address)
    {
        bytes32 flightIdBytes = bytes32(bytes(flightId));
        Flight storage flight = getFlight(flightIdBytes);
        return (flight.status, flight.flightId, flight.seatsCount, flight.seatsRemaining, flight.seatPrice, address(flight.flightNFT));
    }

    function getFlight(bytes32 flightId) private view returns (Flight storage) {
        require(_flights.length > 0, "There are no created flights");
        uint index = _flightIndexFromId[flightId];
        Flight storage flight = _flights[index];
        require(flight.flightId == flightId, "There is no such flight");
        return flight;
    }

    function getAllFlights() public view returns (string[] memory){
        return _flightIds;
    }

    function getBalance() public view returns (uint256) {
        return msg.sender.balance;
    }

}