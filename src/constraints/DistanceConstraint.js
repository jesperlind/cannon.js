/**
 * Distance constraint class
 * @author schteppe
 * @param CANNON.RigidBody bodyA
 * @param CANNON.RigidBody bodyB Could optionally be a CANNON.Vec3 to constrain a body to a static point in space
 * @param float distance
 * @todo test
 */
CANNON.DistanceConstraint = function(bodyA,bodyB,distance){
  CANNON.Constraint.call(this);
  this.body_i = bodyA;
  this.body_j = bodyB;
  this.distance = Number(distance);
  var eq = new CANNON.Equation(bodyA, bodyB instanceof CANNON.RigidBody ? bodyB : null);
  this.equations.push(eq);
};

CANNON.DistanceConstraint.prototype = new CANNON.Constraint();
CANNON.DistanceConstraint.prototype.constructor = CANNON.DistanceConstraint;

CANNON.DistanceConstraint.prototype.update = function(){
  var eq = this.equations[0], bi = this.body_i, bj = this.body_j;
  var pair = bj instanceof CANNON.RigidBody;

  // Jacobian is the distance unit vector
  if(pair)
    bj.position.vsub(bi.position, eq.G1);
  else{
    bi.position.vsub(bj,eq.G1);
  }
  eq.G1.normalize();
  if(eq.G1.isZero()) eq.G1.set(1,0,0);
  eq.G1.negate(eq.G3);
  //console.log(eq.G1.toString());
  
  // Mass properties
  eq.setDefaultMassProps();
  eq.setDefaultForce();

  // Constraint violation
  eq.g1.set((pair ? bj.position.x : bj.x) - bi.position.x - eq.G1.x*this.distance,
	    (pair ? bj.position.y : bj.y) - bi.position.y - eq.G1.y*this.distance,
	    (pair ? bj.position.z : bj.z) - bi.position.z - eq.G1.z*this.distance);
  eq.g1.negate(eq.g1);
  eq.g1.negate(eq.g3);
  //console.log(this.distance,pair,eq.g1.toString());
};

CANNON.DistanceConstraint.prototype.setMaxForce = function(f){
  // @todo rescale with masses
  this.equations[0].lambdamax = Math.abs(f);
  this.equations[0].lambdamin = -this.equations[0].lambdamax;
};