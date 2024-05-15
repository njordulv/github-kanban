import { render, screen } from '@testing-library/react'
import { App } from 'components/App/App'

describe('App component', () => {
  it('renders "Done" & "Progress" texts', () => {
    render(<App />)

    const DoneElement = screen.getByText(/Done/i)
    expect(DoneElement).toBeInTheDocument()

    const ProgressElement = screen.getByText(/Progress/i)
    expect(ProgressElement).toBeInTheDocument()
  })

  it('renders correctly according to the snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
