import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import RegisterPage from '../pages/Register';

const App = () => {
    const [isRegisterVisible, setRegisterVisible] = useState(true);

    const closeRegisterModal = () => {
        setRegisterVisible(false);
    };

    // Optional: If you want to automatically close the register page after a certain time
    useEffect(() => {
        const timeout = setTimeout(closeRegisterModal, 5000); // Adjust the time as needed (in milliseconds)
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div>
            <Modal
                title='Register'
                visible={isRegisterVisible}
                onCancel={closeRegisterModal}
                footer={null}
                maskClosable={false}
                destroyOnClose
                width={500}
                style={{ top: 20 }}
            >
                <RegisterPage onClose={closeRegisterModal} />
            </Modal>
        </div>
    );
};

export default App;
