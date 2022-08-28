import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Input from '../components/input'
import Button from '../components/button'
import { useForm } from 'react-hook-form'
import useMutation from '../libs/client/useMutation'
import { useRouter } from 'next/router'

function cls(...classnames: string[]) {
  return classnames.join('')
}

interface EnterForm {
  email?: string
  phone?: string
}

interface TokenForm {
  token: string
}

interface MutationResult {
  ok: boolean
  payload?: string
}

export function Enter() {
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>('/api/users/enter')
  const [
    confirmToken,
    { loading: tokenLoading, data: tokenData, error: tokenError },
  ] = useMutation<MutationResult>('/api/users/confirm')
  const { register, reset, handleSubmit } = useForm<EnterForm>()
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>()
  const [method, setMethod] = useState<'email' | 'phone'>('email')
  const onEmailClick = () => {
    reset(), setMethod('email')
  }
  const onPhoneClick = () => {
    reset(), setMethod('phone')
  }

  const onValid = (validForm: EnterForm) => {
    if (loading) return
    enter(validForm)
  }
  console.log(data)
  const onTokenValid = (validForm: TokenForm) => {
    confirmToken(validForm)
  }
  const router = useRouter()
  useEffect(() => {
    if (tokenData?.ok) {
      router.push('/')
    }
  }, [tokenData, router])

  return (
    <div className="mt-16 px-4">
      <h1>{data?.payload}</h1>
      <h3 className="text-3xl font-bold text-center">Enter to Orange Market</h3>
      <div className="mt-16">
        {data?.ok ? (
          <form
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className="flex flex-col mt-8 space-y-4 mx-5"
          >
            <Input
              register={tokenRegister('token', {
                required: true,
                minLength: 5,
              })}
              name="token"
              label="Confirm Token"
              type="number"
              required
            />

            <Button text={tokenLoading ? 'loaindg' : 'Confirm Token'} />
          </form>
        ) : (
          <>
            {' '}
            <div className="flex flex-col items-center">
              <h5 className="text-sm text-gray-500 font-medium">
                Enter using:
              </h5>
              <div className="grid grid-cols-2 gap-10 mt-8 border-b w-full pb-2">
                <button
                  className={cls(
                    'pb-4 font-medium border-b-2',
                    method === 'email'
                      ? ' border-red-500  text-red-500'
                      : ' border-transparent hover:text-gray-400 '
                  )}
                  onClick={onEmailClick}
                >
                  Email
                </button>
                <button
                  className={cls(
                    'pb-4 border-b-2 font-medium',
                    method === 'phone'
                      ? ' border-red-500 text-red-500'
                      : ' border-transparent hover:text-gray-400 '
                  )}
                  onClick={onPhoneClick}
                >
                  Phone
                </button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex flex-col mt-8 space-y-4 mx-5"
            >
              {method === 'email' ? (
                <Input
                  register={register('email', { required: true, minLength: 5 })}
                  name="email"
                  label="Email address"
                  type="email"
                  required
                />
              ) : null}
              {method === 'phone' ? (
                <Input
                  register={register('phone', { required: true, minLength: 5 })}
                  name="phone"
                  label="phone number"
                  type="number"
                  kind="phone"
                  required
                />
              ) : null}
              {method === 'email' ? (
                <Button text={loading ? 'loaindg' : 'Get login link'} />
              ) : null}
              {method === 'phone' ? (
                <Button text={loading ? 'loading' : 'Get one-time password'} />
              ) : null}
            </form>
          </>
        )}

        <div className="mt-6 relative">
          <div className="absolute w-full border-t border-gray-300" />
          <div className="relative -top-8 flex items-center justify-center">
            <span className="mt-5 bg-white text-gray-500 px-2">
              Or Enter With
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Enter
