export class StaticDie {
  private static _instance: StaticDie

  private numbers: number[] = []

  private constructor () {
    console.log(`roll 250 die`)

    const populationSize: number = 250
    for (let i = 0; i < populationSize; i++) {
      this.numbers.push(Math.floor(Math.random() * 100))
    }
  }

  private static get instance (): StaticDie {
    return this._instance || (this._instance = new this())
  }

  public static get number (): number {
    let tempNum = this.instance.numbers.shift()
    this.instance.numbers.push(tempNum)
    return tempNum
  }
}
