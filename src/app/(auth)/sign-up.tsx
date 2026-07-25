import { useAuth, useSignUp } from '@clerk/expo'
import { type Href, Link, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')

  const handleSubmit = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    })
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }

    if (!error) await signUp.verifications.sendEmailCode()
  }

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    })
    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask)
            return
          }

          const url = decorateUrl('/')
          if (url.startsWith('http')) {
            window.location.href = url
          } else {
            router.push(url as Href)
          }
        },
      })
    } else {
      console.error('Sign-up attempt not complete:', signUp)
    }
  }

  if (signUp.status === 'complete' || isSignedIn) {
    return null
  }

  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 p-5 gap-3">
        <Text className="text-2xl font-bold mb-2">Verify your account</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 text-base bg-white"
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        {errors.fields.code && (
          <Text className="text-red-600 text-xs -mt-2">{errors.fields.code.message}</Text>
        )}
        <Pressable
          className="bg-blue-600 py-3 px-6 rounded-lg items-center mt-2"
          style={({ pressed }) => ({
            opacity: fetchStatus === 'fetching' ? 0.5 : pressed ? 0.7 : 1,
          })}
          onPress={handleVerify}
          disabled={fetchStatus === 'fetching'}
        >
          <Text className="text-white font-semibold">Verify</Text>
        </Pressable>
        <Pressable
          className="py-3 px-6 rounded-lg items-center mt-2"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          onPress={() => signUp.verifications.sendEmailCode()}
        >
          <Text className="text-blue-600 font-semibold">I need a new code</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View className="flex-1 p-5 gap-3">
      <Text className="text-2xl font-bold mb-2">Sign up</Text>

      <Text className="font-semibold text-sm">Email address</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 text-base bg-white"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#666666"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
      {errors.fields.emailAddress && (
        <Text className="text-red-600 text-xs -mt-2">{errors.fields.emailAddress.message}</Text>
      )}

      <Text className="font-semibold text-sm">Password</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 text-base bg-white"
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#666666"
        secureTextEntry
        onChangeText={setPassword}
      />
      {errors.fields.password && (
        <Text className="text-red-600 text-xs -mt-2">{errors.fields.password.message}</Text>
      )}

      <Pressable
        className="bg-blue-600 py-3 px-6 rounded-lg items-center mt-2"
        style={({ pressed }) => ({
          opacity: (!emailAddress || !password || fetchStatus === 'fetching')
            ? 0.5
            : pressed
            ? 0.7
            : 1,
        })}
        onPress={handleSubmit}
        disabled={!emailAddress || !password || fetchStatus === 'fetching'}
      >
        <Text className="text-white font-semibold">Sign up</Text>
      </Pressable>

      {errors && <Text className="text-xs opacity-50 mt-2">{JSON.stringify(errors, null, 2)}</Text>}

      <View className="flex-row gap-1 mt-3 items-center">
        <Text>Already have an account? </Text>
        <Link href="/sign-in">
          <Text className="text-blue-600">Sign in</Text>
        </Link>
      </View>

      {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
      <View nativeID="clerk-captcha" />
    </View>
  )
}