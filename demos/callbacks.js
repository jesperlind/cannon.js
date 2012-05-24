/**
 * Callback related demos
 */
var demo = new CANNON.Demo();

// Using the preStep callback to add a force
demo.addScene(function(app){
    var world = setupWorld(app);

    var mass = 5;
    var moonShape = new CANNON.Sphere(0.5);
    var planetShape = new CANNON.Sphere(3.5);
    var moon = new CANNON.RigidBody(mass,moonShape);
    var planet = new CANNON.RigidBody(0,planetShape);
    moon.position.set(5,0,0);
    moon.velocity.set(0,0,8);
    moon.linearDamping = 0.0;

    // Use the preStep callback to apply the gravity force on the moon.
    // This callback is evoked each timestep
    moon.preStep = function(){
      // Get the vector pointing from the moon to the planet center
      var moon_to_planet = new CANNON.Vec3();
      this.position.negate(moon_to_planet);

      // Get distance from planet to moon
      var distance = moon_to_planet.norm();

      // Now apply force on moon
      // Fore is pointing in the moon-planet direction
      moon_to_planet.normalize();
      moon_to_planet.mult(1500/Math.pow(distance,2),this.force);
    }

    world.add(moon);
    world.add(planet);
    app.addVisual(moon);
    app.addVisual(planet);
  });

function setupWorld(app){
  // Create world
  var world = new CANNON.World();
  app.setWorld(world);
  world.gravity.set(0,0,0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;
  return world;
};

demo.start();