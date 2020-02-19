// import Web3 from 'web3';

declare const window: any;
// declare const web3: Web3;

export const Greeter = (name: string) => `Hello ${name}`;

export async function CheckMetamaskInstalled() {
  if (!(window as any).ethereum) {
    window.alert('Please install MetaMask first.');
  } else {
    return true
  }
}

export async function GetPublicAddress() {
  try {
    const accounts = await window.ethereum.enable();
    return accounts
  } catch (error) {
    window.alert('You need to allow MetaMask.');
    return false;
  }
}

export async function Authenticate() {
  CheckMetamaskInstalled().then(value => {
    if (value) {
      GetPublicAddress().then(value => {
        if (value) {
          window.alert(value)
        }
      })
    }
  })
}
