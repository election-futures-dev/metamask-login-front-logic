import Web3 from 'web3';

let web3: Web3 | undefined = undefined;

declare const window: any;

// export const Greeter = (name: string) => `Hello ${name}`;

export function CheckMetamaskInstalled(): void {
  if (!(window as any).ethereum) {
    window.alert('Please install MetaMask first.');
  }
};

export async function GetPublicAddress() {
  if (!web3) {
    try {
      const accounts = await window.ethereum.enable()
      web3 = new Web3(window.ethereum);
    } catch (error) {
      window.alert('You need to allow MetaMask.');
      return;
    }
  }
}
