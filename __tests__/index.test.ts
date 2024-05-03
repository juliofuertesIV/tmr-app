require('@testing-library/jest-dom')
const { constructor } = require('@/app/api/_utils/index')

console.log({ constructor })

describe('API Response Constructor', () => {
    it('returns error as null when there is no error', () => {

        const payload = { 
            message: 'Successful query.',
            success: true,
            error: null,
            data: { id: 1, name: 'Testing.' }
        }

        expect(
            constructor(payload))
            .toEqual(payload)
    })
})