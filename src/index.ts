import Web3 from 'web3';

declare let window: any;
declare let web3: Web3;

export const Greeter = (name: string) => `Hello ${name}`;

function createNonce() {
  const dict = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
  let result = '';

  for (let i = 0; i < 10; i++) {
    const rand = Math.floor(Math.random() * 36);
    result += dict[rand];
  }

  return result;
}

async function CheckMetamaskInstalled() {
  if (!window.ethereum) {
    window.alert('Please install MetaMask first.');
    return;
  } else {
    web3 = new Web3(window.ethereum);
    return true;
  }
}

async function GetPublicAddress() {
  try {
    const publicAddressArray: string[] = await window.ethereum.enable();
    const publicAddress = publicAddressArray[0];
    return publicAddress;
  } catch (error) {
    window.alert('You need to allow MetaMask.');
    return;
  }
}

async function GetSignature(publicAddress: string) {
  const nonce = createNonce();
  const signature = await web3.eth.personal.sign(nonce, publicAddress, '');
  return signature;
}

export async function Authenticate() {
  CheckMetamaskInstalled().then(installed => {
    if (installed) {
      GetPublicAddress().then(publicAddress => {
        if (publicAddress) {
          GetSignature(publicAddress).then(signature => {
            window.alert(signature);
          });
        }
      });
    }
  });
}
