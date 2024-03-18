/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import crypto from 'crypto'

import styles from './styles.module.css';

const LiqPayPay = ({
  publicKey,
  privateKey,
  amount,
  currency,
  description = 'test',
  orderId = Math.floor(1 + Math.random() * 900000000),
  title = 'Сплатити',
  style,
  disabled,
  extra,
  ...props
}) => {
  const jsonString = {
    public_key: publicKey,
    version: '3',
    action: 'pay',
    amount: amount,
    currency: currency,
    description: description,
    order_id: orderId,
    ...props
  }

  function utf8_to_b64(str) {
    return Buffer.from(str, 'utf-8').toString('base64');
}
  const data = utf8_to_b64(JSON.stringify(jsonString))
  const signString = privateKey + data + privateKey
  const sha1 = crypto.createHash('sha1')
  sha1.update(signString)
  const signature = sha1.digest('base64')

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
  
    if (props.onClick) {
      try {
        await props.onClick(); 
        
        document.getElementById("liqpayForm").submit();
      } catch (error) {
        console.error("Помилка при створенні замовлення:", error);
        
      }
    }
  };

  return (
    <form
      method='POST' action='https://www.liqpay.ua/api/3/checkout'
      acceptCharset='utf-8'
      style={{ ...style }}
      id="liqpayForm"
      onSubmit={handleFormSubmit}
    >
      <input
        type='hidden' name='data' value={data}
      />
      <input type='hidden' name='signature' value={signature} />
      {extra || (
        <button className={classNames(styles.buttonSubmit)} disabled={disabled}>
          <img
            src='https://static.liqpay.ua/buttons/logo-small.png' name='btn_text'
          />
          <span>{title} {amount} {currency}</span>
        </button>
      )}
    </form>
  )
}



export default LiqPayPay