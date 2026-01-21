
// "use client"
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useChat } from '@ai-sdk/react'
// const Page = () => {
//   const [prompt, setPrompt] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [reply, setReply] = useState('')
//   const {messages}
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!prompt.trim()) return
//     setLoading(true)
//     try {
//       const res = await axios.post('http://localhost:3000/api/chat', { prompt })
//       setReply(res.data?.reply ?? JSON.stringify(res.data))
//     } catch (err: any) {
//       setReply(err?.response?.data?.error ?? err.message ?? 'Request failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4">Chat</h1>

//         <div className="mb-4">
//           <div className="min-h-[140px] max-h-64 overflow-auto p-4 bg-gray-100 rounded-md">
//             {reply ? (
//               <pre className="whitespace-pre-wrap text-sm text-gray-900">{reply}</pre>
//             ) : (
//               <p className="text-sm text-gray-500">Responses will appear here.</p>
//             )}
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="flex gap-3">
//           <input
//             aria-label="Prompt"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Enter prompt..."
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Sending...' : 'Send'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Page
// // ...existing code...