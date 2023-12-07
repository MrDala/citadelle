class CustomArray<T> extends Array<T> {

  customForEach(index: number, callback: (element: T, currentIndex: number, array: T[]) => void, completeIterations: number = 1): void {
    const totalIterations = this.length * completeIterations;

    for (let i = 0; i < totalIterations; i++) {
      let currentIndex = (index + i) % this.length;
      callback(this[currentIndex], currentIndex, this);
    }
  }

  forEachInRange(indexDepart: number, indexFin: number, callback: (element: T, currentIndex: number, array: T[]) => void): void {
    indexDepart = (indexDepart + this.length) % this.length;
    indexFin = (indexFin + this.length) % this.length;
  
    const totalIterations = (indexFin - indexDepart + this.length) % this.length + 1;
  
    for (let i = 0; i < totalIterations; i++) {
      const currentIndex = (indexDepart + i) % this.length;
      callback(this[currentIndex], i, this);
    }
  }
  

  melangerListe(): void {
    this.sort(() => Math.random() - 0.5);
  }
}


export default CustomArray;
