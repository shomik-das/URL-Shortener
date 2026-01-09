"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface Url {
  _id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
}

export default function CreateLink() {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urls, setUrls] = useState<Url[]>([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/url/my-urls`,
        { credentials: "include" }
      );

      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message || "Failed to load URLs");
        return;
      }
      setUrls(data.urls);
    } catch {
      toast.error("Failed to load URLs");
    }
  };

  const handleShortenUrl = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/url/shorten`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ originalUrl: longUrl }),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message || "Failed to shorten URL");
        return;
      }
      setShortCode(data.url.shortCode);
      setLongUrl("");
      fetchUrls();
      toast.success("Short URL created");
    } catch (error: any) {
      toast.error(error.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/url/${shortCode}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Add Link</h1>
          <p className="text-muted-foreground">
            Create and manage shortened URLs
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Links</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {urls.length} / 100
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Clicks</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {totalClicks}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avg Clicks</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {urls.length ? Math.round(totalClicks / urls.length) : 0}
            </CardContent>
          </Card>
        </div>

        {/* Create URL */}
        <Card>
          <CardHeader>
            <CardTitle>Create Short URL</CardTitle>
            <CardDescription>
              Paste a long URL to generate a short link
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleShortenUrl} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <LinkIcon className="h-4 w-4" />
                </span>
                <Input
                  type="url"
                  placeholder="https://example.com/very/long/url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  disabled={loading || urls.length >= 100}
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-md font-semibold"
                disabled={loading || urls.length >= 100}
              >
                {loading ? "Creating..." : "Shorten URL"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result */}
        {shortCode && (
          <Card className="border-green-300">
            <CardHeader>
              <CardTitle className="text-green-700">Success</CardTitle>
              <CardDescription>Your short URL is ready:</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <LinkIcon className="h-4 w-4" />
              </span>
              <Input
                value={`${process.env.NEXT_PUBLIC_API_URL}/api/url/${shortCode}`}
                readOnly
                className="w-full"
              ></Input>
              <Button
                onClick={copyToClipboard}
                size="lg"
                className="rounded-md"
              >
                {copied ? <Check /> : <Copy />}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
