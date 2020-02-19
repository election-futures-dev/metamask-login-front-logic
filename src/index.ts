import Web3 from 'web3';

declare let window: any;
declare let web3: Web3;

export const Greeter = (name: string) => `Hello ${name}`;

function createNonce() {

  var dict = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
  var result = "";

  for (var i = 0; i < 10; i++) {
    var rand = Math.floor(Math.random() * 36);
    result += dict[rand];
  }

  return result;

}

async function CheckMetamaskInstalled() {
  if (!window.ethereum) {
    window.alert('Please install MetaMask first.');
    return
  } else {
    web3 = new Web3(window.ethereum);
    return true;
  }
}

async function GetPublicAddress() {
  try {
    let publicAddressArray: string[] = await window.ethereum.enable();
    let publicAddress = publicAddressArray[0]
    return publicAddress
  } catch (error) {
    window.alert('You need to allow MetaMask.');
    return
  }
}

async function GetSignature(publicAddress: string) {
  var nonce = createNonce()
  let signature = web3.eth.personal.sign(nonce, publicAddress, '')
  return signature
}

export async function Authenticate() {
  CheckMetamaskInstalled().then(installed => {
    if (installed) {
      GetPublicAddress().then(publicAddress => {
        if (publicAddress) {
          // window.alert(publicAddress);
          let signature = GetSignature(publicAddress)
          window.alert(signature)
        }
      });
    }
  });
}

