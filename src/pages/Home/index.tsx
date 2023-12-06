import Bar from "./Bar";
import Main from "./Main";

export default function HomePage (props: HomePageProps) {
    return (
        <div className="container">
            <Main
                sortedTracks={props.sortedTracks}
                plModifierProps={props.plModifierProps}
                tracksSelection={props.tracksSelection}
            />
            <Bar currentTrack={props.currentTrack} />
            <footer className="footer"></footer>
        </div>
    );
}