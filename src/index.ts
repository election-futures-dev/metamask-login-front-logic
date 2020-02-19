import Web3 from 'web3';

declare const window: any;
declare const web3: Web3;

export const Greeter = (name: string) => `Hello ${name}`;

export function CheckMetamaskInstalled(): void {
  if (!(window as any).ethereum) {
    window.alert('Please install MetaMask first.');
  }
}

export async function GetPublicAddress() {
  if (!web3) {
    try {
      const accounts = await window.ethereum.enable();
      window.alert(`${JSON.stringify(accounts)}`);
      // web3 = new Web3(window.ethereum);
    } catch (error) {
      window.alert('You need to allow MetaMask.');
      return;
    }
  } else {
    window.alert('!web == false');
  }
}
