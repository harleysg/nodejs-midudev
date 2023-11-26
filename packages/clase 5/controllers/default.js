export class DefaultController {
  static async otherWise(req, res) {
    res.status(404).json({ message: 'Not found' })
  }
}