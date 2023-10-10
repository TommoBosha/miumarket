import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {
    return (
        <div className='mb-5 flex fles-wrap'>
            {
                ['Авторизація', 'Адреса відправки', 'Способ оплати', 'Інформація про замовлення'].map(
                    (step, index) => (
                        <div
                            key={step}
                            className={`flex-1 border-b-2 text-center
                            ${index <= activeStep
                                    ? 'border-blue-300 text-blue-300'
                                    : 'border-gray-400 text-gray-400'
                                }`
                            }
                        >
                            {step}
                        </div>
                    ))
            }
        </div>
    )
}
