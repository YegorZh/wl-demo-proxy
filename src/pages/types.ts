export enum DemoType {
  Businesses = "businesses",
}

export type StartTriggerData = {
  demoType: DemoType;
  token: string;
};
