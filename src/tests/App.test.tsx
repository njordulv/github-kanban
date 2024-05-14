import { render, screen } from '@testing-library/react'
import { App } from 'components/App/App'

describe('App component', () => {
  it('Renders "Done" & "Progress" texts', () => {
    render(<App />)

    const DoneElement = screen.getByText(/Done/i)
    const ProgressElement = screen.getByText(/Progress/i)

    expect(DoneElement).toBeInTheDocument()
    expect(ProgressElement).toBeInTheDocument()
  })

  it('If renders correctly', () => {
    const AppSnapshot = render(<App />)

    expect(AppSnapshot).toMatchSnapshot()
  })
})
