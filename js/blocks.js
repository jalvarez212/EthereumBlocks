var web3 = new Web3('wss://mainnet.infura.io/ws/v3/54458b95c9b541c09452a4a48c3d3376');
console.log(web3);
var blockchainData = [];
var showBlock = document.getElementById('blockheader');


function alert(){
var info = document.getElementById('alert');
info.style.display = "block";
setTimeout(function(){info.style.display = "none";}, 500);
var sound = document.querySelector('audio');
sound.play();
const playedPromise = sound.play();
if (playedPromise) {
        playedPromise.catch((e) => {
            if (e.name === 'NotAllowedError' ||
                e.name === 'NotSupportedError') {
                //console.log(e.name);
            }
        });
    }
}



web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
	console.log("New block received: " + result.number);
	console.log(result);
	blockchainData.push(result);
	// Dispatch the event.
	document.dispatchEvent(newBH);
	alert();
	var loadIcon = document.getElementById('lds-spinner');
	loadIcon.remove();

	//alert();
    } else{
    console.error(error);}
});
