import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BodyListLayout from '../index';
import { store, persistor } from '../../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

describe('<BodyListLayout />', () => {

    const onClickIconMock = jest.fn();
    const iconSrcMock = jest.fn(() => ('urlTest'));
    const imagesListArray = [
        {
            id: 'test',
            title: 'test title',
            username: 'test username',
            images: {
                fixed_height: {
                    url: 'https://media.giphy.com/media/AOhdWUrZiNb4A/giphy.gif'
                }
            }
        }
    ];

    const renderComponent = () => {
        const props = {
            title: 'Test text',
            totalGifs: 2300,
            imagesList: imagesListArray,
            onClickIcon: onClickIconMock,
            iconSrc: iconSrcMock,
            iconSize: 20,
        };
        return render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BodyListLayout {...props}/>
                </PersistGate>
            </Provider>
        )
    }

    test('Should render component', async() => {
        renderComponent();
        expect(screen.getByText('Test text')).toBeInTheDocument();
        expect(screen.getByText('test title')).toBeInTheDocument();
        expect(screen.getByText('test username')).toBeInTheDocument();
        expect(screen.getByText('2,300 GIFs')).toBeInTheDocument();
        
        waitFor(() => expect(screen.getAllByTestId('gif-element')).toBeInTheDocument());
        waitFor(() => expect(screen.getAllByTestId('icon-element')).toBeInTheDocument());

        expect(iconSrcMock).toBeCalled();
        expect(onClickIconMock).not.toBeCalled();

        waitFor(() => {
            const iconNode = screen.getByTestId('icon-element');
            fireEvent.click(iconNode);
            expect(onClickIconMock).toBeCalled();
        });
    });
})