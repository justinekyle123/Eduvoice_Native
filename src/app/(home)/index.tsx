import { useClerk, useUser } from '@clerk/expo'
import { Link } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function Page() {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      <View className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
          👋 Welcome!
        </Text>
        <Text className="text-center text-gray-500 mb-6">
          {user ? 'You are signed in' : 'Please sign in to continue'}
        </Text>

        {user ? (
          // Signed‑in state
          <>
            <View className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-200">
              <Text className="text-sm text-gray-500">Signed in as</Text>
              <Text className="text-base font-medium text-gray-800">
                {user.emailAddresses[0]?.emailAddress || 'No email'}
              </Text>
            </View>
            <Pressable
              className="bg-red-500 py-3 px-6 rounded-xl items-center active:opacity-70"
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              onPress={() => signOut()}
            >
              <Text className="text-white font-semibold text-base">Sign out</Text>
            </Pressable>
          </>
        ) : (
          // Signed‑out state
          <>
            <Link href="/(auth)/sign-in" asChild>
              <Pressable
                className="bg-blue-600 py-3 px-6 rounded-xl items-center mb-3"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-white font-semibold text-base">Sign in</Text>
              </Pressable>
            </Link>
            <Link href="/(auth)/sign-up" asChild>
              <Pressable
                className="border border-blue-600 py-3 px-6 rounded-xl items-center"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-blue-600 font-semibold text-base">Sign up</Text>
              </Pressable>
            </Link>
          </>
        )}
      </View>
    </View>
  )
}