class CustomArray<T> extends Array<T> {

  public customForEach(index: number, callback: (element: T, currentIndex: number, array: T[]) => void, completeIterations: number = 1): void {
    const totalIterations = this.length * completeIterations;

    for (let i = 0; i < totalIterations; i++) {
      let currentIndex = (index + i) % this.length;
      callback(this[currentIndex], currentIndex, this);
    }
  }

  public forEachInRange(indexDepart: number, indexFin: number, callback: (element: T, currentIndex: number, array: T[]) => void): void {
    indexDepart = (indexDepart + this.length) % this.length;
    indexFin = (indexFin + this.length) % this.length;
  
    const totalIterations = (indexFin - indexDepart + this.length) % this.length + 1;
  
    for (let i = 0; i < totalIterations; i++) {
      const currentIndex = (indexDepart + i) % this.length;
      callback(this[currentIndex], i, this);
    }
  }

  public transfer(destination: CustomArray<T>, elementsToTransfer: T | T[]): void {
    if (Array.isArray(elementsToTransfer)) {
      destination.push(...elementsToTransfer);
      this.remove(elementsToTransfer);
    } else {
      destination.push(elementsToTransfer);
      this.remove(elementsToTransfer);
    }
  }

  public transferAll(destination: CustomArray<T>): void {
    destination.push(...this);
    this.removeAll();
  }

  public remove(elements: T | T[]): void {
    if (Array.isArray(elements)) {
      elements.forEach(element => {
        const index = this.indexOf(element);
        if (index !== -1) {
          this.splice(index, 1);
        }
      });
    } else {
      const index = this.indexOf(elements);
      if (index !== -1) {
        this.splice(index, 1);
      }
    }
  }

  public removeAll(): void{
    this.length = 0;
  }

  public melanger(): void {
    this.sort(() => Math.random() - 0.5);
  }
}


export default CustomArray;
