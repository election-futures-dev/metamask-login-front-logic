import Web3 from 'web3';
import axios from 'axios';

declare let window: any;
declare let web3: Web3;

export const Greeter = (name: string) => `Hello ${name}`;

const authUrlEndpoint = 'https://9sskfavyih.execute-api.ap-northeast-2.amazonaws.com/dev/auth';

function createNonce() {
  const dict = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
  let result = '';

  for (let i = 0; i < 10; i++) {
    const rand = Math.floor(Math.random() * 36);
    result += dict[rand];
  }

  return result;
}

async function checkMetamaskInstalled() {
  if (!window.ethereum) {
    window.alert('Please install MetaMask first.');
    return;
  } else {
    web3 = new Web3(window.ethereum);
    return true;
  }
}

async function getPublicAddress() {
  try {
    const publicAddressArray: string[] = await window.ethereum.enable();
    const publicAddress = publicAddressArray[0];
    return publicAddress;
  } catch (error) {
    window.alert('You need to allow MetaMask.');
    return;
  }
}

async function getSignature(address: string) {
  const nonce = createNonce();
  try {
    const signature = await web3.eth.personal.sign(nonce, address, '');
    return { nonce, signature };
  } catch (error) {
    window.alert('You need to sign in MetaMask.');
    return;
  }
}

type AuthData = {
  publicAddress: string;
  nonce: string;
  signature: string;
};

async function getToken(result: AuthData) {
  const response = await axios.post(authUrlEndpoint, result);
  if (response.data.token) {
    return response.data.token;
  } else {
    window.alert('Authenticate Failed.');
    return response;
  }
}

export async function Authenticate() {
  let nonce: string;
  let signature: string;

  checkMetamaskInstalled().then(installed => {
    if (installed) {
      getPublicAddress().then(publicAddress => {
        if (publicAddress) {
          getSignature(publicAddress).then(data => {
            if (data?.signature) {
              nonce = data.nonce;
              signature = data.signature;
              const result = {
                publicAddress,
                nonce,
                signature,
              };
              getToken(result).then(response => {
                window.alert(response);
                return response;
              });
            }
          });
        }
      });
    }
  });
}
