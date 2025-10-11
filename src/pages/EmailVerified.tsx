import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Music } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function EmailVerified() {
  const navigate = useNavigate()

  const handleGoToSignIn = () => {
    navigate('/booking')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-accent">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-green-700">Email Confirmed!</CardTitle>
          <CardDescription>
            Thanks for confirming your email. Your account is now active and ready to use.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Ready to Book Your Lessons?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Sign in to access your dashboard and start booking music lessons with BEATS2BRIDGES.
            </p>
          </div>
          
          <Button 
            onClick={handleGoToSignIn}
            className="w-full"
            size="lg"
          >
            Go to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}