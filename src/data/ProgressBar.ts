class ProgressBar {
  get isCompleted(): boolean {
    return this.percentage === 100
  }

  get percentage(): number {
    if (this.currentAmount === 0 || this.maximumAmount === 0) return 0

    return Math.min(100 * (this.currentAmount / this.maximumAmount), 100)
  }

  constructor(
    public label: string,
    public currentAmount: number,
    public maximumAmount: number,
    public backgroundColor: string,
  ) {}
}

export default ProgressBar
