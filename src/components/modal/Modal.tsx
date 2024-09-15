import { FC } from 'react'
import { useCtx } from '../../Ctx';


const Modal: FC = ({ }) => {
    const { modalTitle, modalCtx, modalVisible, setModalVisible, setModalAccept } = useCtx();
    return (<>
        {modalVisible &&
            <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* Background overlay */}
                <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={() => setModalVisible(false)}></div>

                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-10 animate-slideIn">
                    <h2 className="text-xl font-bold mb-4 text-blue-600">{modalTitle}</h2>
                    <p className="text-gray-600 mb-6">{modalCtx}</p>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => {
                                setModalVisible(false); // Close the modal
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            No
                        </button>
                        <button
                            onClick={() => { setModalAccept(true); setModalVisible(false) }}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>}
    </>
    )
}

export default Modal