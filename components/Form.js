import React, { useState, useEffect } from 'react'
import Web3 from "web3";
import PersonId from "../artifacts/contracts/PersonalID.sol/PersonId.json";

var CryptoJS = require("crypto-js");

function Form() {

    const [femail,setfemail] = useState("");
    const [fpassword,setfpassword] = useState("");
    const [frpassword,setfrpassword] = useState("");
    const [fname,setfname] = useState("");
    const [flname,setflname] = useState("");
    const [fphone,setfphone] = useState("");
    const [fcompany,setfcompany] = useState("");

    const [error, setError] = useState("");


    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [totalToken, setTotalToken] = useState(0);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(URL);
        if (
          fname === "" ||
          flname === "" ||
          femail === "" ||
          fpassword === "" ||
          frpassword === "" ||
          fphone === "" ||
          fcompany === ""


        ) {
          setError("Required Field(s) are incomplete");
        } else {
          var data = [
            {
              
              firstName: fname,
              lastName: flname,
                email: femail,
                password: fpassword,
                confirmPassword: frpassword,
                phone: fphone,
                company: fcompany,
                
                

            },
          ];
          var cipherText = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            "my-secret-key@123"
          ).toString();
          console.log(cipherText);
          mint(firstName, cipherText);
          db.collection("UserInfo")
            .add({
              firstName: fname,
                lastName: flname,
                email: femail,
                password: fpassword,
                confirmPassword: frpassword,
                phone: fphone,
                company: fcompany,

              
            //   photoUrl: URL,
            //   facialEmotionArr: facialEmotionArr.facialEmotionArr,
            //   email: currentUser.femail,
            //   encrpt: cipherText
            })
            .then(() => {
               alert(`Form has been submitted, Token id is ${totalToken - 1}`);
              history.push("/");
            })
            .catch((error) => {
              alert(error.message);
            });
          setfname("");
          setflname("");
            setfemail("");
            setfpassword("");
            setfrpassword("");
            setfphone("");
            setfcompany("");

         
        }
      };

      async function loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          window.alert(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
        }
      }
    
      async function loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = PersonId.networks[networkId];
        if (networkData) {
          const abi = PersonId.abi;
          const address = networkData.address;
          const contract = new web3.eth.Contract(abi, address);
          setContract(contract);
          const person = await contract.methods.names(1).call();
          const num = await contract.methods.tokenCounter.call();
          // for (var i = 1; i <= 5; i++){
          //   const person = await contract.methods.names(i - 1).call()
          //   this.setState({names: [...this.state.names, person]})
          // }
          const count = parseInt(num, 10);
    
          setTotalToken(count - 1);
        } else {
          window.alert("contract not on this nework");
        }
      }
    
      function mint(person, data) {
        contract.methods.mint(person, data).send({ from: account });
        let num = contract.methods.tokenCounter.call();
        console.log("ran");
      }
    
      useEffect(() => {
        (async () => {
          if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
          } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
          } else {
            window.alert(
              "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
          }
        })();
        (async () => {
          const web3 = window.web3;
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
          const networkId = await web3.eth.net.getId();
          const networkData = PersonId.networks[networkId];
          if (networkData) {
            const abi = PersonId.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);
            setContract(contract);
            const person = await contract.methods.names(1).call();
            const num = await contract.methods.tokenCounter.call();
            // for (var i = 1; i <= 5; i++){
            //   const person = await contract.methods.names(i - 1).call()
            //   this.setState({names: [...this.state.names, person]})
            // }
            const count = parseInt(num, 10);
            console.log(count);
            setTotalToken(count);
          } else {
            window.alert("contract not on this nework");
          }
        })();
        // await loadWeb3()
        // await loadBlockchainData()
      }, []);


  return (
    
<form>
  <div className="relative z-0 mb-6 w-full group">
      <input type="email" name="floating_email" id="femail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 mb-6 w-full group">
      <input type="password" name="floating_password" id="fpassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="relative z-0 mb-6 w-full group">
      <input type="password" name="repeat_password" id="frpassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
      <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 mb-6 w-full group">
        <input type="text" name="floating_first_name" id="fname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div className="relative z-0 mb-6 w-full group">
        <input type="text" name="floating_last_name" id="flname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 mb-6 w-full group">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="fphone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
    </div>
    <div className="relative z-0 mb-6 w-full group">
        <input type="text" name="floating_company" id="fcompany" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
    </div>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

  )
}

export default Form