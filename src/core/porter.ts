import type { DataSource } from "./dataSource";
import type { Destination } from "./destination";
import type { Bibliography } from "../bibliography/bibliography";

export class Porter {
  private dataSources: DataSource[] = [];
  private destinations: Map<string, Destination> = new Map();

  registerDataSource(dataSource: DataSource): void {
    this.dataSources.push(dataSource);
  }

  registerDestination(id: string, destination: Destination): void {
    this.destinations.set(id, destination);
  }

  getAvailableDataSources(): DataSource[] {
    return this.dataSources.filter(source => source.canScrape());
  }

  getDestinations(): Map<string, Destination> {
    return this.destinations;
  }

  scrapeData(): Bibliography | null {
    const availableSource = this.getAvailableDataSources()[0];
    if (!availableSource) {
      return null;
    }
    return availableSource.scrape();
  }

  exportTo(destinationId: string, bibliography: Bibliography): void {
    const destination = this.destinations.get(destinationId);
    if (!destination) {
      throw new Error(`Destination ${destinationId} not found`);
    }
    destination.export(bibliography);
  }
}