/**
 * Experiment for testing constraints
 */
var demo = new CANNON.Demo();

demo.addScene(function(app){
    var size = 0.5;
    var dist = size*2+0.12;
    var world = setupWorld(app);
    var sphereShape = new CANNON.Sphere(size);
    var mass = 1;
    var lastBody = null;
    var N = 10;
    for(var i=0; i<N; i++){
      // Create a new body
      var spherebody = new CANNON.RigidBody(i===0 ? 0 :mass,sphereShape);
      spherebody.position.set(0,0,(N-i)*dist);
      spherebody.velocity.x = i;
      world.add(spherebody);
      app.addVisual(spherebody);
     
      // Connect this body to the last one
      var c;
      if(lastBody!==null){
	c = new CANNON.DistanceConstraint(spherebody,lastBody,dist);
      } else {
	c = new CANNON.DistanceConstraint(spherebody,
					  new CANNON.Vec3(0,0,N*dist),
					  0);
      }
      world.addConstraint(c);
      lastBody = spherebody;
    }
  });

function setupWorld(app){
  // Create world
  var world = new CANNON.World();
  app.setWorld(world);
  world.gravity.set(0,0,-40);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  // ground plane
  var n = new CANNON.Vec3(0,0,1);
  n.normalize();
  var groundShape = new CANNON.Plane(n);
  var groundBody = new CANNON.RigidBody(0,groundShape);
  groundBody.position.set(0,0,1);
  world.add(groundBody);
  app.addVisual(groundBody);

  return world;
};

demo.start();