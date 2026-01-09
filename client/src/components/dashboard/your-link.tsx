"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Copy,
  Trash2,
  Check,
  ExternalLink,
  Eye,
  X,
} from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

interface UrlItem {
  _id: string
  originalUrl: string
  shortCode: string
  clicks: number
  createdAt: string
}

export default function LinksPage() {
  const [links, setLinks] = useState<UrlItem[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [viewingUrl, setViewingUrl] = useState<UrlItem | null>(null)
  const [copiedOriginal, setCopiedOriginal] = useState(false)
  const [copiedShort, setCopiedShort] = useState(false)

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/url/my-urls`,
        { credentials: "include" }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      setLinks(data.urls)
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch links")
    } finally {
      setLoading(false)
    }
  }

  const copyShortFromTable = async (shortCode: string) => {
    const shortUrl = `${process.env.NEXT_PUBLIC_API_URL}/${shortCode}`
    await navigator.clipboard.writeText(shortUrl)
    setCopiedCode(shortCode)
    toast.success("Short URL copied")
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const copyOriginalUrl = async () => {
    if (!viewingUrl) return
    await navigator.clipboard.writeText(viewingUrl.originalUrl)
    setCopiedOriginal(true)
    toast.success("Original URL copied")
    setTimeout(() => setCopiedOriginal(false), 2000)
  }

  const copyShortFromModal = async () => {
    if (!viewingUrl) return
    const shortUrl = `${process.env.NEXT_PUBLIC_API_URL}/${viewingUrl.shortCode}`
    await navigator.clipboard.writeText(shortUrl)
    setCopiedShort(true)
    toast.success("Short URL copied")
    setTimeout(() => setCopiedShort(false), 2000)
  }

  const deleteLink = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return

    setDeleting(id)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/url/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      setLinks((prev) => prev.filter((l) => l._id !== id))
      toast.success("Link deleted")
    } catch (err: any) {
      toast.error(err.message || "Failed to delete link")
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Your Links</h1>
          <p className="text-muted-foreground">
            Manage and track all your shortened URLs
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Shortened Links</CardTitle>
            <CardDescription>Total links: {links.length}</CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading links...
              </div>
            ) : links.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No shortened links yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Short Code</TableHead>
                    <TableHead>Original URL</TableHead>
                    <TableHead className="text-center">Clicks</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {links.map((link) => (
                    <TableRow key={link._id}>
                      <TableCell className="font-mono text-blue-600">
                        {link.shortCode}
                      </TableCell>

                      <TableCell className="max-w-xs truncate">
                        {link.originalUrl}
                      </TableCell>

                      <TableCell className="text-center">
                        {link.clicks}
                      </TableCell>

                      <TableCell>
                        {format(new Date(link.createdAt), "MMM d, yyyy")}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-md"
                            onClick={() => setViewingUrl(link)}
                          >
                            <Eye size={16} />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-md"
                            onClick={() => copyShortFromTable(link.shortCode)}
                          >
                            {copiedCode === link.shortCode ? (
                              <Check size={16} />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>

                          <Button size="sm" variant="ghost" className="rounded-md" asChild>
                            <a
                              href={`${process.env.NEXT_PUBLIC_API_URL}/${link.shortCode}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={16} />
                            </a>
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteLink(link._id)}
                            disabled={deleting === link._id}
                            className="text-red-600 rounded-md"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {viewingUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>Link Details</CardTitle>
              <Button size="lg" className="rounded-md" variant="ghost" onClick={() => setViewingUrl(null)}>
                <X/>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded break-all font-mono text-blue-600">
                {`${process.env.NEXT_PUBLIC_API_URL}/${viewingUrl.shortCode}`}
              </div>

              <div className="bg-muted p-4 rounded break-all">
                {viewingUrl.originalUrl}
              </div>

              <div className="flex gap-2">
                <Button onClick={copyOriginalUrl} className=" rounded-md ">
                  {copiedOriginal ? "Copied!" : "Copy Original URL"}
                </Button>

                <Button
                  onClick={copyShortFromModal}
                  variant="outline"
                  className="rounded-md"
                >
                  {copiedShort ? "Copied!" : "Copy Short URL"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
