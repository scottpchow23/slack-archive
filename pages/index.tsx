import useSWR from "swr";
import ChannelList from "components/channelList";
import Layout from "components/layout";
import MemberTable from "components/memberTable";
import KeywordSearch from "components/keywordSearch";

export default function Home() {
  const { data } = useSWR("/api/channels");
  if (data) {
    
    if (data.channels && data.messages && data.users) {
      const channels = data.channels;
      const messages = data.messages;
      const users = data.users;
      const workspace = {
        name: "Workspace",
        members: users,
      };
      return (
        <Layout>
          <>
            <h1>A list of slack channels should appear here:</h1>
            <MemberTable channel={workspace} users={users} messages={messages} />
            <KeywordSearch users={users} messages={messages} />
            <ChannelList channels={channels} />
          </>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <>
          <h1>There don't seem to be any channels here :(</h1>
          <p>You might need follow the setup instructions in the README.md to load the slack information here.</p>
          </>
        </Layout>
      )
    }
  }

  return <h1>Loading...</h1>;
}
