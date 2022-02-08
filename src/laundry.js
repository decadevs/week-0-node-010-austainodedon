/**
 * Laundry Problem
 *
 * @param {number} noOfWashes
 * @param {number[]} cleanPile
 * @param {number[]} dirtyPile
 *
 * @returns {number}
 */
function getMaxcleanPairs(noOfWashes, cleanPile, dirtyPile) {
  //Procedure, first, get the no of poosible cleanPairs in the clean,
  //second, given the number of possible washes establish how many
  //dirty socks should be washed also considering the neededone to pair
  //the clean sock

  // To start Create 2 Objects of Clean and Dirty socks
  //storage to keep track of things(no of socks)
  let cleanContainer = {};
  let dirtyContainer = {};
  //Loop through to build the containers from the initial given array
  //this categorises a sock color to the no pressent {1:3, 2:4}
  for (const cleanSock of cleanPile) {
    //compressed if statement to add one for a color type if seen or to
    //assign 1 if not seen yet
    cleanContainer[cleanSock] = cleanContainer[cleanSock] + 1 || 1;
  }
  for (const dirtySock of dirtyPile) {
    dirtyContainer[dirtySock] = dirtyContainer[dirtySock] + 1 || 1;
  }
  // Then Loop through the dirty container to see if there's clean sock
  //that need to be paired and wash
  // and check if it's available in the dirty container considering the no
  //of washes possible and update the various container and no of whashes remaining

  for (const sock of Object.keys(dirtyContainer)) {
    if (noOfWashes) {
      if (cleanContainer[sock] % 2 === 1 && dirtyContainer[sock]) {
        dirtyContainer[sock] -= 1;
        cleanContainer[sock] += 1;
        noOfWashes--;
      }
    }
  }
  // Now Do another loop through the dirty container to check if there are
  //cleanPairs to be washed and still within no of washes
  for (const sock of Object.keys(dirtyContainer)) {
    // Exact pair of dirty socks
    if (dirtyContainer[sock] % 2 === 0) {
      if (noOfWashes > dirtyContainer[sock]) {
        let washes = dirtyContainer[sock];
        cleanContainer[sock] = cleanContainer[sock] + washes || washes;
        dirtyContainer[sock] -= washes;
        noOfWashes -= washes;
      } else {
        let washes = Math.floor(noOfWashes / 2) * 2;
        cleanContainer[sock] = cleanContainer[sock] + washes || washes;
        dirtyContainer[sock] -= washes;
        noOfWashes -= washes;
      }
      // Do a pair or more
    } else if (dirtyContainer[sock] / 2 >= 1) {
      if (noOfWashes > dirtyContainer[sock]) {
        let washes = Math.floor(dirtyContainer[sock] / 2) * 2;
        cleanContainer[sock] = cleanContainer[sock] + washes || washes;
        dirtyContainer[sock] -= washes;
        noOfWashes -= washes;
      } else {
        let washes = Math.floor(noOfWashes / 2) * 2;
        cleanContainer[sock] = cleanContainer[sock] + washes || washes;
        dirtyContainer[sock] -= washes;
        noOfWashes -= washes;
      }
    }
  }
  //assign pair the value from the cleanContainer object
  let cleanPairs = Object.values(cleanContainer);
  // Now get the total number of pair by adding up each cleanPairs
  totalPair = cleanPairs.reduce((cleanPairs, sock) => {
    return cleanPairs + Math.floor(sock / 2);
  }, 0);
  return totalPair;
}
//try out a solution
const noOfWashes = 2;
const cleanPile = [1, 2, 3, 1, 2, 3];
const dirtyPile = [3, 3, 4, 1, 2, 7, 9];
console.log(getMaxcleanPairs(noOfWashes, cleanPile, dirtyPile));

module.exports = getMaxcleanPairs;
