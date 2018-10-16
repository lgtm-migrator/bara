import bara from '../bara'

describe('Bara', () => {
  it('create Bara instance', () => {
    const app = bara();
    expect(app).toHaveProperty('streams');
  })
})
