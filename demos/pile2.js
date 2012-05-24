var demo = new CANNON.Demo();
var size = 1;

// Spheres
demo.addScene(function(app){
    // Create world
    var world = new CANNON.World();
    app.setWorld(world);
    world.gravity.set(0,0,-50);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 2;
    
    // ground plane
    var groundShape = new CANNON.Plane(new CANNON.Vec3(0,0,1));
    var groundBody = new CANNON.RigidBody(0,groundShape);
    groundBody.position.set(0,0,0);
    world.add(groundBody);
    app.addVisual(groundBody);

    // plane -x
    var planeShapeXmin = new CANNON.Plane(new CANNON.Vec3(0,1,0));
    var planeXmin = new CANNON.RigidBody(0, planeShapeXmin);
    planeXmin.position.set(0,-5,0);
    world.add(planeXmin);

    // Plane +x
    var planeShapeXmax = new CANNON.Plane(new CANNON.Vec3(0,-1,0));
    var planeXmax = new CANNON.RigidBody(0, planeShapeXmax);
    planeXmax.position.set(0,5,0);
    world.add(planeXmax);

    // Plane -y
    var planeShapeYmin = new CANNON.Plane(new CANNON.Vec3(1,0,0));
    var planeYmin = new CANNON.RigidBody(0, planeShapeYmin);
    planeYmin.position.set(-5,0,0);
    world.add(planeYmin);

    // Plane +y
    var planeShapeYmax = new CANNON.Plane(new CANNON.Vec3(-1,0,0));
    var planeYmax = new CANNON.RigidBody(0, planeShapeYmax);
    planeYmax.position.set(5,0,0);
    world.add(planeYmax);

    var bodies = [];
    var i = 0;
    var interval = setInterval(function(){
	// Sphere
	i++;
	var sphereShape = new CANNON.Sphere(size);
	var b1 = new CANNON.RigidBody(5,sphereShape);
	b1.position.set(2*size*Math.sin(i),2*size*Math.cos(i),7*2*size);
	world.add(b1);
	app.addVisual(b1);
	bodies.push(b1);

	if(bodies.length>80){
	  var b = bodies.shift();
	  app.removeVisual(b);
	  world.remove(b);
	  /*clearInterval(interval);*/
	}
      },100);

  });

demo.start();
