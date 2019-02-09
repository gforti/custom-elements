import { PackageService } from '../../src/services/index.js'

describe('PackageService', () => {

  const expect = chai.expect

  describe('functions', () => {

    it('should evaluate request errors', async () => {
      const response = Error()
      const message = PackageService.evaluateRequestError(response)
      expect(message).to.equal('Could not connect to the server.')
    })

    it('should evaluate request response errors', async () => {
      const myBlob = new Blob()
      const response400 = new Response(myBlob, { status : 400 })
      const response404 = new Response(myBlob, { status : 404 })
      const response500 = new Response(myBlob, { status : 500 })
      let message = PackageService.evaluateRequestError(response400)
      expect(message).to.equal('Validation Error.')

      message = PackageService.evaluateRequestError(response404)
      expect(message).to.equal('Server is not available.')

      message = PackageService.evaluateRequestError(response500)
      expect(message).to.equal('Server is experiencing issues.')
    })

    it('should return formatted date and time', () => {
      const epoch = new Date('Wed Dec 31 1969 19:00:00')
      expect(PackageService._formatDateAndTime(epoch)).to.equal('12/31/1969 7:00 PM')
    })

    it('should return Invalid Date string when not given a date', () => {
      expect(PackageService._formatDateAndTime()).to.equal('Invalid Date')
    })

  })
})
