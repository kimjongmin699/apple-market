import useMutation from '@libs/client/useMutation'
import useUser from '@libs/client/useUser'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/button'
import Input from '../../components/input'
import Layout from '../../components/layout'

interface EditProfileForm {
  email?: string
  phone?: string
  name?: string
  avatar?: FileList
  formErrors?: string
}

interface EditProfileResponse {
  ok: boolean
  error?: string
}

const EditProfile: NextPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>()

  useEffect(() => {
    if (user?.name) setValue('name', user?.name)
    if (user?.email) setValue('email', user?.email)
    if (user?.phone) setValue('phone', user?.phone)
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/9VhLr461mPKMhcmTPOPfGg/${user?.avatar}/appleavatar`
      )
  }, [user, setValue])

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`)

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return
    if (email === '' && phone === '' && name === '') {
      return setError('formErrors', {
        message: 'Email Or Phone number are required.',
      })
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json()

      const form = new FormData()
      form.append('file', avatar[0], user?.id + '')
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json()

      editProfile({
        email, //: email !== user?.email ? email : '',
        phone,
        name, //: phone !== user?.phone ? phone : '',
        avatarId: id,
      })
    } else {
      editProfile({
        email, //: email !== user?.email ? email : '',
        phone,
        name, //: phone !== user?.phone ? phone : '',
      })
    }
  }
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('formErrors', { message: data.error })
    }
  }, [data, setError])
  useEffect(() => {
    if (data && data.ok) {
      router.push('/profile')
    }
  }, [data, router])
  const [avatarPreview, setAvatarPreview] = useState('')
  const avatar = watch('avatar')
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]
      setAvatarPreview(URL.createObjectURL(file))
    }
  }, [avatar])
 
  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <Image
              width={52}
              height={52}
              alt="Picture of the author"
              src={avatarPreview}
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-400" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register('avatar')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register('name')}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register('email')}
          required={false}
          label="Email"
          name="email"
          type="email"
        />
        <Input
          register={register('phone')}
          required={false}
          label="Phone Number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-bold block">
            {errors.formErrors?.message}
          </span>
        ) : null}
        <Button text={loading ? 'Loading' : 'Update Profile'} />
      </form>
    </Layout>
  )
}

export default EditProfile
