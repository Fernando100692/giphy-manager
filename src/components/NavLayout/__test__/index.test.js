import { render, screen } from '@testing-library/react';
import NavLayout from '../index';
import { store, persistor } from '../../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

describe('<NavLayout />', () => {

    const renderComponent = () => {
        const props = {
            left: <h1>left</h1>,
            center: <h1>center</h1>,
            right: <h1>right</h1>
        };
        return render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavLayout {...props}/>
                </PersistGate>
            </Provider>
        )
    }

    test('Should render component', () => {
        renderComponent();
        expect(screen.getByText('left')).toBeInTheDocument();
        expect(screen.getByText('center')).toBeInTheDocument();
        expect(screen.getByText('right')).toBeInTheDocument();
    });
})