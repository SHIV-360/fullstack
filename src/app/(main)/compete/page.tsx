
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Swords, Trophy, Shield } from 'lucide-react';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/fade-in';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getCtfs, getLeaderboardData, getTeamById } from '@/lib/api';

export default function CompetePage() {
  const [liveCtfs, setLiveCtfs] = useState<any[]>([]);
  const [upcomingCtfs, setUpcomingCtfs] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [myTeam, setMyTeam] = useState<any>(null);
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      const allChallenges = await getCtfs();
      setLiveCtfs(allChallenges.filter((c: any) => c.status === 'live'));
      setUpcomingCtfs(allChallenges.filter((c: any) => c.status === 'upcoming'));
      
      const leaderboardData = await getLeaderboardData();
      setLeaderboard(leaderboardData);

      if (user && userData?.teamId) {
        const team = await getTeamById(userData.teamId);
        if (team) {
            team.members = [
                { uid: user.uid, username: user.displayName, role: 'Leader' },
                { uid: '2', username: 'Analyst Jane', role: 'Member' }
            ];
            setMyTeam(team);
        }
      }
      setLoading(false);
    };

    fetchPageData();
  }, [user, userData]);

  const formatTimeDiff = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    if(diff < 0) return "Event Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `${days}d ${hours}h`;
  };

  return (
    <>
      <section className="bg-card pt-24 md:pt-32">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
            Compete & Conquer
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-muted-foreground mb-8 font-serif">
            Test your forensic skills against the best in our Capture The Flag competitions.
            Join a team, climb the ranks, and win prizes.
          </p>
          <Separator className="my-8" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <main className="lg:col-span-2">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary" /> Live Events
              </h2>
              {liveCtfs.map((ctf) => (
                <Card key={ctf.id} className="card-gradient-glow overflow-hidden mb-12 group transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm">
                  <div className="relative h-64">
                     <Image src={ctf.image?.src || 'https://picsum.photos/800/400'} alt={ctf.title} data-ai-hint={ctf.image?.hint || 'cyber competition'} fill className="object-cover group-hover:scale-105 transition-transform" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 text-white">
                       <h3 className="text-2xl md:text-4xl font-bold">{ctf.title}</h3>
                       <p className="text-base md:text-lg text-muted-foreground">{ctf.organizer}</p>
                     </div>
                  </div>
                  <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-card gap-4">
                      <div className="flex flex-wrap justify-between sm:justify-start gap-y-2 gap-x-4 sm:gap-x-8">
                        <div>
                          <p className="text-sm text-muted-foreground">Prize Pool</p>
                          <p className="text-xl sm:text-2xl font-bold text-primary">{ctf.prize}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Participants</p>
                          <p className="text-xl sm:text-2xl font-bold">{ctf.participants?.toLocaleString()}</p>
                        </div>
                         <div>
                          <p className="text-sm text-muted-foreground">Ends In</p>
                          <p className="text-xl sm:text-2xl font-bold">{formatTimeDiff(ctf.endTime)}</p>
                        </div>
                      </div>
                      <Button size="lg" className="w-full sm:w-auto shrink-0">
                        <Swords className="mr-2" />
                        Join Now
                      </Button>
                  </CardContent>
                </Card>
              ))}
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Upcoming CTFs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingCtfs.map((ctf) => (
                  <Card key={ctf.id} className="card-gradient-glow flex flex-col hover:scale-105 transition-transform duration-300 bg-card/80 backdrop-blur-sm">
                     <CardHeader>
                        <CardTitle>{ctf.title}</CardTitle>
                        <CardDescription>{ctf.organizer}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                         <div className="flex justify-between text-sm text-muted-foreground mb-4">
                           <span>Starts in: {formatTimeDiff(ctf.startTime)}</span>
                           <span>{ctf.participants} interested</span>
                         </div>
                         <div className="font-bold text-lg text-primary">{ctf.prize} Prize Pool</div>
                      </CardContent>
                      <CardFooter className='bg-secondary/20'>
                        <Button className="w-full" variant="outline">
                          <Clock className="mr-2" />
                          Notify Me
                        </Button>
                      </CardFooter>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </main>

          <aside className="lg:col-span-1">
             <FadeIn delay={0.4}>
              <Card className="card-gradient-glow sticky top-24 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <Tabs defaultValue="leaderboard" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                      <TabsTrigger value="team">My Team</TabsTrigger>
                    </TabsList>
                    <TabsContent value="leaderboard" className="mt-6">
                       <CardTitle className="flex items-center gap-2 mb-4">
                         <Trophy className="text-primary" /> Global Top Teams
                       </CardTitle>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Rank</TableHead>
                              <TableHead>Team</TableHead>
                              <TableHead className="text-right">Score</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {leaderboard.map((team) => (
                              <TableRow key={team.id}>
                                <TableCell className="font-medium">{team.rank}</TableCell>
                                <TableCell>{team.name}</TableCell>
                                <TableCell className="text-right">{team.score.toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="team" className="mt-6">
                       {myTeam ? (
                         <>
                           <CardTitle className="flex items-center gap-2 mb-4">
                              <Shield className="text-primary" /> {myTeam.name}
                           </CardTitle>
                           <CardDescription className='mb-4'>Global Rank: <span className='font-bold text-primary'>#{myTeam.rank}</span></CardDescription>
                           <div className="space-y-4">
                            {myTeam.members.map((member: any) => (
                              <div key={member.uid} className='flex items-center justify-between bg-secondary/30 p-3 rounded-md'>
                                <div>
                                  <p className='font-semibold'>{member.username || 'Member'}</p>
                                  <p className='text-sm text-muted-foreground'>{member.role || 'Role'}</p>
                                </div>
                                <Button variant='ghost' size='sm'>View Profile</Button>
                              </div>
                            ))}
                           </div>
                           <Button className="w-full mt-6">Manage Team</Button>
                         </>
                       ) : (
                         <div className="text-center p-8">
                           <p>You are not part of a team yet.</p>
                           <Button className="mt-4">Create or Join a Team</Button>
                         </div>
                       )}
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </FadeIn>
          </aside>
        </div>
      </section>
    </>
  );
}
