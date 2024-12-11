"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import Image from "next/image"

interface UpdateScoresDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (data: { rank: number; percentile: number; score: number }) => void
  currentValues: {
    rank: number
    percentile: number
    score: number
  }
}

export function UpdateScoresDialog({ open, onOpenChange, onUpdate, currentValues }: UpdateScoresDialogProps) {
  const [formData, setFormData] = useState(currentValues)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.percentile < 0 || formData.percentile > 100) {
      setError("Percentile must be between 0 and 100")
      return
    }
    
    if (formData.score < 0 || formData.score > 15) {
      setError("Score must be between 0 and 15")
      return
    }

    onUpdate(formData)
    onOpenChange(false)
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Update scores</DialogTitle>
            <Image src="/placeholder.svg" alt="HTML5 Logo" width={40} height={40} />
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white">
                1
              </div>
              <Label htmlFor="rank" className="text-xl font-medium">
                Update your Rank
              </Label>
            </div>
            <Input
              id="rank"
              type="number"
              value={formData.rank}
              onChange={(e) => setFormData({ ...formData, rank: Number(e.target.value) })}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white">
                2
              </div>
              <Label htmlFor="percentile" className="text-xl font-medium">
                Update your Percentile
              </Label>
            </div>
            <Input
              id="percentile"
              type="number"
              value={formData.percentile}
              onChange={(e) => setFormData({ ...formData, percentile: Number(e.target.value) })}
              className="text-lg"
              required
              min="0"
              max="100"
            />
            <p className="text-sm text-red-500">required | percentile 0-100</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white">
                3
              </div>
              <Label htmlFor="score" className="text-xl font-medium">
                Update your Current Score (out of 15)
              </Label>
            </div>
            <Input
              id="score"
              type="number"
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
              className="text-lg"
              max="15"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-8"
            >
              cancel
            </Button>
            <Button type="submit" className="bg-blue-900 px-8">
              save <span className="ml-2">→</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

