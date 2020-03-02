var newBH = new Event('build');

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );


var blockchain = [];
var mesh;

function newBlock(){
var geometry = new THREE.BoxGeometry( 10, 10, 10 );
var material = new THREE.MeshBasicMaterial( {color: 0x0B5394} );
material.wireframe = true;
mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
blockchain.push(mesh);
startChain();
};


function startChain(){


	for (i=0; i < blockchain.length; i++ ){
			var currentPosX = blockchain[i].position.x;
			var currentPosY = blockchain[i].position.y;
			var currentPosZ = blockchain[i].position.z;
			TweenMax.to(blockchain[i].position, 1, {z:currentPosZ - 25});
	}
};




document.addEventListener('build', newBlock);
window.addEventListener( "mousemove", onDocumentMouseMove, false );
window.addEventListener( "touchstart", onDocumentMouseMove, false );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 25;
camera.position.y = 25;
camera.position.x = 25;

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.maxDistance = 400;
controls.minDistance = 15;

controls.update();


function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	//cube.position.z -= .5;

}
var selectedObject = null;

function findBlock(x){
	for (var i = 0; i < blockchainData.length; i++)
		{ 

			if (blockchainData.indexOf(blockchainData[i])==blockchain.indexOf(x))
				{
					console.log('Found Match!');
					showBlock.innerHTML = 
					"number: "+blockchainData[i].number+"<br>"+
					"difficulty: "+blockchainData[i].difficulty+"<br>"+
					"gasLimit: "+blockchainData[i].gasLimit+"<br>"+
					"gasUsed: "+blockchainData[i].gasUsed+"<br><br>"+
					"hash: "+blockchainData[i].hash+"<br><br>"+
					"miner: "+blockchainData[i].miner+"<br><br>"+
					"mixHash: "+blockchainData[i].mixHash+"<br><br>"+
					"nonce: "+blockchainData[i].nonce+"<br><br>"+
					"parentHash: "+blockchainData[i].parentHash+"<br><br>"+
					"receiptsRoot: "+blockchainData[i].receiptsRoot+"<br><br>"+
					"sha3Uncles: "+blockchainData[i].sha3Uncles+"<br><br>"+
					"stateRoot: "+blockchainData[i].stateRoot+"<br><br>"+
					"timestamp: "+blockchainData[i].timestamp+"<br><br>"+
					"transactionsRoot: "+blockchainData[i].transactionsRoot;"<br>"
					}

		 }
		}




		function onDocumentMouseMove( event ) {



			event.preventDefault();
			if ( selectedObject ) {
				selectedObject.material.color.set( '#0B5394' );
				showBlock.style.display = "none";

			}

			var intersects = getIntersects( event.layerX, event.layerY );

			
			if ( intersects.length > 0 ) {

				var res = intersects.filter( function ( res ) {

					return res && res.object;

				} )[ 0 ];

				if ( res && res.object ) {

					selectedObject = res.object;
					selectedObject.material.color.set( '#f00' );
					showBlock.style.display = "block";
					findBlock(res.object);



				}

			}

		}





		var raycaster = new THREE.Raycaster();
		var mouseVector = new THREE.Vector3();

		function getIntersects( x, y ) {

			x = ( x / window.innerWidth ) * 2 - 1;
			y = - ( y / window.innerHeight ) * 2 + 1;

			mouseVector.set( x, y, 0.5 );
			raycaster.setFromCamera( mouseVector, camera );
			return raycaster.intersectObjects( blockchain, true );

		}

animate();
