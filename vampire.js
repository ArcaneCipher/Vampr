class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    // Add the given vampire to the offspring array of this vampire
    this.offspring.push(vampire);

    // Set the creator of the given vampire to this vampire
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    // Return the length of the offspring array, which represents the count of vampires created
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0; // Initialize the count of generations from the original vampire
    let currentVampire = this; // Start with the current vampire instance

    // Traverse up the lineage until the original vampire (creator is null) is reached
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator; // Move up to the creator (parent vampire)
      numberOfVampires++; // Increment the count of generations
    }

    // Return the total number of generations from the original vampire
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    // Compare the number of generations from the original vampire
    // Return true if this vampire is closer to the original vampire
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // Create a set to store the current vampire's ancestors
    const ancestors = new Set();
    
    // Add this vampire's ancestors to the set
    let currentVampire = this;
    while (currentVampire) {
      ancestors.add(currentVampire);
      currentVampire = currentVampire.creator;
    }
    
    // Traverse the other vampire's lineage and find the first common ancestor
    currentVampire = vampire;
    while (currentVampire) {
      if (ancestors.has(currentVampire)) {
        return currentVampire;
      }
      currentVampire = currentVampire.creator;
    }
    
    // If no common ancestor is found (shouldn't happen in a valid tree), return null
    return null;
  }
}

module.exports = Vampire;

