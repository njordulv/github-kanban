import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'
import { reduxStore, persistor } from '../redux/store'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <ReduxProvider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </ReduxProvider>
    </ChakraProvider>
  )
}
