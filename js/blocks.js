var web3 = new Web3('wss://mainnet.infura.io/ws/v3/54458b95c9b541c09452a4a48c3d3376');
console.log(web3);
var blockchainData = [];
var showBlock = document.getElementById('blockheader');


function alert(){
var info = document.getElementById('alert');
info.style.display = "block";
setTimeout(function(){info.style.display = "none";}, 500);

}
function playSound(filename){
    var mp3Source = '<source src="' + filename + '.mp3" type="audio/mpeg">';
    var oggSource = '<source src="' + filename + '.ogg" type="audio/ogg">';
    var embedSource = '<embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3">';
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay">' + mp3Source + oggSource + embedSource + '</audio>';
      }



web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
	console.log("New block received: " + result.number);
	console.log(result);
	blockchainData.push(result);
	// Dispatch the event.
	document.dispatchEvent(newBH);
	alert();
	playSound('block');
	var loadIcon = document.getElementById('lds-spinner');
	loadIcon.remove();

	//alert();
    } else{
    console.error(error);}
});
