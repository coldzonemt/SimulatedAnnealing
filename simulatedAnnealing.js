var knapsack = {items: [], maxWeight: 17, currentWeight: 0}; // NP-hard
var items = [ // allowed multiple of each
  {name:'apple',    weight:3, value:20},
  {name:'blanket',  weight:4, value:40},
  {name:'lantern',  weight:5, value:10},
  {name:'radio',    weight:6, value:30}
];

function generateRandomSolution(){
  var solution = [];
  var weight = 0;
  var thing;
  while(weight<=knapsack.maxWeight){ //while weight is less than or equal to 17
    thing = items[randomIndex(items)];
    weight+=thing.weight;
    solution.push(thing);
  }
  solution.pop();
  return solution; // array of items, must be <= maxWeight
};

function generateNeighboringSolution(oldSolution){
  // add, swap, or remove item randomly
  //or consider using random to switch out a random item for another item
  var solution = [];
  var weight = 0;
  var thing;
  while(weight<=knapsack.maxWeight){
    thing = items[randomIndex(items)];
    weight+=thing.weight;
    solution.push(thing);
  }
  solution.pop();
  return solution; // array of items, must be <= maxWeight
}

function calculateCost(solution){
  //like weigh, only for the value in the items array
  return solution.reduce(function(total, item){ return total + item.value}, 0); // sum of values of items
}

function acceptance_probability(old_cost, new_cost, temperature){
  return Math.pow(Math.E, (new_cost - old_cost)/temperature); // probability to jump
}

function simulateAnnealing(){
  //0 = original, or old; 1 = new
  var solution0 = generateRandomSolution();
  var cost0 = calculateCost(solution0);
  var solution1, cost1, ap;
  var T = 1.0;
  var T_min = 0.00001;
  var alpha = 0.9;
  var i = 1;

  while(T>T_min){
    i=1;
    while(i<=100){
      solution1 = generateNeighboringSolution(solution0);
      cost1 = calculateCost(solution1);
      ap = acceptance_probability(cost0, cost1, T);
      if(ap > Math.random()){
        solution0 = solution1;
        cost1 = cost0;
      }
      i++;
    }
    T*=alpha
  }
  return solution0; // array of items, must be <= maxWeight
};

///////////////////////////////////
// HELPER FUNCTIONS              //
// don't modify, but you can use //
///////////////////////////////////

function randomIndex(list){
  return Math.floor(Math.random()*list.length);
}

function weigh(solution){
  return solution.reduce(function(total, item){ return total + item.weight}, 0);
}
