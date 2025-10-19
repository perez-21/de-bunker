"use server";
import * as ethers from "ethers";
import * as EthCrypto from "eth-crypto";

export async function encryptSecretKey(
  secretKey: CryptoKey, recipientPublicKey: string
) {

  const rawSecretKeyBuffer = await crypto.subtle.exportKey("raw", secretKey);
  const uint8Array = new Uint8Array(rawSecretKeyBuffer);
  const binaryString = String.fromCharCode(...uint8Array);
  const base64SecretKey = btoa(binaryString);

  const encryptedKeyObject = await EthCrypto.encryptWithPublicKey(
    recipientPublicKey,
    base64SecretKey, 
  );

  const encryptedKeyString = EthCrypto.cipher.stringify(encryptedKeyObject);

  return encryptedKeyString;
}
