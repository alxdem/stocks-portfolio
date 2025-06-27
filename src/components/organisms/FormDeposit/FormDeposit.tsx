import styles from '@organisms/FormDeposit/FormDeposit.module.css';
import Button from '@atoms/Button/Button';
import Field from '@molecules/Field/Field';
import {cvvOptions, cardNumberOptions, expDateOptions, paymentOptions, message, QUERY_TABLET} from '@utils';
import {useForm, Controller, type SubmitHandler} from 'react-hook-form';
import * as z from 'zod/v4';
import {zodResolver} from '@hookform/resolvers/zod';
import CreditCard from '@molecules/CreditCard/CreditCard';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import useAddOperation from '@hooks/useAddOperation';
import Spinner from '@atoms/Spinner/Spinner';
import cn from 'classnames';
import type {ComponentPropsWithoutRef} from 'react';

const FormDeposit = ({className}: ComponentPropsWithoutRef<'form'>) => {
    const isTablet = useAppMediaQuery(QUERY_TABLET);
    const {isLoading, addOperation} = useAddOperation();

    const formDepositSchema = z.object({
        number: z.string(message.REQUIRED).length(19, message.INCORRECT),
        expDate: z.string(message.REQUIRED).length(5, message.INCORRECT),
        cvv: z.string(message.REQUIRED).length(3, message.INCORRECT),
        payment: z.string(message.REQUIRED).min(1, message.INCORRECT),
    });

    type FormData = z.infer<typeof formDepositSchema>;

    const {
        control,
        handleSubmit,
        watch,
        reset,
        clearErrors,
        formState: {
            errors,
        },
    } = useForm<FormData>({
        resolver: zodResolver(formDepositSchema),
        shouldUnregister: false,
        defaultValues: {
            number: '',
            expDate: '',
            cvv: '',
            payment: '',
        },
    });

    const formValues = watch();

    const classes = cn(
        styles.form,
        isLoading && styles.loading,
        className,
    );

    const submit: SubmitHandler<FormData> = async (data) => {
        const res = formDepositSchema.safeParse(data);

        if (!res.success) {
            console.log('Error', res.error.issues);
        } else {
            await addOperation({
                date: Date.now(),
                symbol: '',
                price: Number(res.data.payment),
                value: 1,
                type: 'deposit',
            });
            reset();
            setTimeout(() => clearErrors(), 0);
        }
    };

    return (
        <form
            className={classes}
            onSubmit={handleSubmit(submit)}
        >
            <div className={styles.inner}>
                <Controller
                    control={control}
                    name='number'
                    render={({field: {onChange, ...rest}, fieldState: {error}}) => {
                        return (
                            <Field
                                className={styles.number}
                                label='Card Number (16 numbers)'
                                {...rest}
                                maskOptions={cardNumberOptions}
                                error={error?.message || ''}
                                disabled={isLoading}
                                onAccept={onChange}
                            />
                        )
                    }}
                />

                <Controller
                    control={control}
                    name='expDate'
                    render={({field: {onChange, ...rest}}) => (
                        <Field
                            label='Exp. date (mm/yy)'
                            {...rest}
                            maskOptions={expDateOptions}
                            error={errors.expDate?.message}
                            disabled={isLoading}
                            onAccept={onChange}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='cvv'
                    render={({field: {onChange, ...rest}}) => (
                        <Field
                            label='CVV'
                            {...rest}
                            maskOptions={cvvOptions}
                            error={errors.cvv?.message}
                            disabled={isLoading}
                            onAccept={onChange}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='payment'
                    render={({field: {onChange, ...rest}}) => (
                        <Field
                            label='payment (max: $10 000)'
                            className={styles.payment}
                            {...rest}
                            maskOptions={paymentOptions}
                            unmask={true}
                            error={errors.payment?.message}
                            disabled={isLoading}
                            onAccept={onChange}
                        />
                    )}
                />

                <Button
                    className={styles.button}
                    as='button'
                    size='large'
                    type='submit'
                    disabled={isLoading}
                >
                    Pay
                </Button>

                <Spinner className={styles.spinner} />
            </div>
            {!isTablet &&
                <CreditCard
                    number={formValues.number}
                    expDate={formValues.expDate}
                    cvv={formValues.cvv}
                />
            }
        </form>
    );
};

export default FormDeposit;
