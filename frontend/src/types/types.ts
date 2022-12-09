export interface Receipt {
  blockHash: string;
  blockNumber: number;
  contractAddress: null | string;
  cumulativeGasUsed: number;
  effectiveGasPrice: number;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: false;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  type: string;
  events: {};
}
