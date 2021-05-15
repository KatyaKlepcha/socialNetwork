import React from 'react'
import styles from './FormsControls.module.css'

type TextareaPropsType = {
    input: string
    meta: any
    child: any
    element: any
}

const FormControl: React.FC<TextareaPropsType> = ({input, meta, child, element, ...props}) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const TextArea = (props: any) => {
    const {input, meta, child,...restProps} = props
    return <FormControl {...props}> <textarea {...input}{...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, child,...restProps} = props
    return <FormControl {...props}> <input {...input}{...restProps}/></FormControl>
}
